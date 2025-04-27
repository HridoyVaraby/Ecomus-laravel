<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with featured products and categories.
     */
    public function index()
    {
        // Get featured products
        $featuredProducts = Product::with('category')
            ->where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();
        
        // Get featured categories
        $featuredCategories = Category::where('is_featured', true)
            ->orderBy('sort_order')
            ->take(4)
            ->get();
        
        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts,
            'featuredCategories' => $featuredCategories,
        ]);
    }
}