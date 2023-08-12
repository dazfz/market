<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();

        $products = $products->map(function ($product) {
            // Obtener URL incompleta de la imagen
            $imagePath = $product->image;
            // Obtener URL completa de la imagen
            $imageUrl = asset('storage/' . $imagePath);

            // Agregar la URL de la imagen al producto
            $product->imageURL = $imageUrl;

            // Eliminar la propiedad 'image' del objeto para que no se incluya en la respuesta 
            unset($product->image);

            return $product;
        });

        return response()->json($products);
    }

    public function store(Request $request)
    {
        // Guardar la imagen en storage y guardar el path en la BD
        $path = $request->file('image')->store('images', 'public');

        $product = new Product([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'description' => $request->input('description'),
            'stock' => $request->input('stock'),
            'image' => $path,
            'ogstock' => $request->input('ogstock'),
            'date' => $request->input('date'),
        ]);

        $product->save();

        // Eliminar image de la respuesta y agregar imageURL como respuesta
        unset($product->image);
        $imageUrl = asset('storage/' . $path);
        $product->imageURL = $imageUrl;
        return response()->json($product, 201);
    }

    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    // Update sin imagen PUT
    public function update(Request $request)
    {
        $productId = $request->input('id');
        $product = Product::findOrFail($productId);
        $data = $request->all();

        $path = $product->image;
        $data['image'] = $path;
        $product->update($data);

        unset($product->image);

        return response()->json($product, 200);
    }

    // Update con imagen POST
    public function updateimg(Request $request)
    {
        $productId = $request->input('id');
        $product = Product::findOrFail($productId);
        $data = $request->all();

        $path = $request->file('image')->store('images', 'public');
        $data['image'] = $path;
        $product->update($data);

        unset($product->image);

        $imageUrl = asset('storage/' . $path);
        $product->imageURL = $imageUrl;

        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(null, 204);
    }
}
