<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the shopping cart.
     */
    public function index()
    {
        $cartItems = Session::get('cart', []);
        $products = [];
        $total = 0;
        
        foreach ($cartItems as $id => $details) {
            $product = Product::find($id);
            if ($product) {
                $price = $product->sale_price ?? $product->price;
                $itemTotal = $price * $details['quantity'];
                $total += $itemTotal;
                
                $products[] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => $price,
                    'image' => $product->images[0] ?? null,
                    'quantity' => $details['quantity'],
                    'size' => $details['size'] ?? null,
                    'color' => $details['color'] ?? null,
                    'itemTotal' => $itemTotal
                ];
            }
        }
        
        return Inertia::render('Cart/Index', [
            'cartItems' => $products,
            'total' => $total
        ]);
    }
    
    /**
     * Add a product to the cart.
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'size' => 'nullable|string',
            'color' => 'nullable|string',
        ]);
        
        $cart = Session::get('cart', []);
        $productId = $request->product_id;
        
        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] += $request->quantity;
        } else {
            $cart[$productId] = [
                'quantity' => $request->quantity,
                'size' => $request->size,
                'color' => $request->color,
            ];
        }
        
        Session::put('cart', $cart);
        
        return redirect()->back()->with('success', 'Product added to cart successfully!');
    }
    
    /**
     * Update cart item quantity.
     */
    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
        
        $cart = Session::get('cart', []);
        $productId = $request->product_id;
        
        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] = $request->quantity;
            Session::put('cart', $cart);
        }
        
        return redirect()->back()->with('success', 'Cart updated successfully!');
    }
    
    /**
     * Remove an item from the cart.
     */
    public function remove(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);
        
        $cart = Session::get('cart', []);
        $productId = $request->product_id;
        
        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            Session::put('cart', $cart);
        }
        
        return redirect()->back()->with('success', 'Item removed from cart!');
    }
    
    /**
     * Clear the entire cart.
     */
    public function clear()
    {
        Session::forget('cart');
        return redirect()->back()->with('success', 'Cart cleared successfully!');
    }
}