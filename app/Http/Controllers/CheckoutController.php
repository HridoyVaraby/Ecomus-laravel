<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Display the checkout page.
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
        
        return Inertia::render('Checkout/Index', [
            'cartItems' => $products,
            'total' => $total
        ]);
    }
    
    /**
     * Process the checkout and create an order.
     */
    public function process(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'country' => 'required|string|max:2',
            'card_number' => 'required|string|max:19',
            'card_name' => 'required|string|max:255',
            'expiry_month' => 'required|string|max:2',
            'expiry_year' => 'required|string|max:4',
            'cvv' => 'required|string|max:4',
        ]);
        
        // Here you would typically:
        // 1. Create an order in the database
        // 2. Process payment with a payment gateway
        // 3. Clear the cart on successful payment
        
        // For now, we'll just clear the cart and redirect to a success page
        Session::forget('cart');
        
        return redirect()->route('checkout.success');
    }
    
    /**
     * Display the checkout success page.
     */
    public function success()
    {
        return Inertia::render('Checkout/Success');
    }
}