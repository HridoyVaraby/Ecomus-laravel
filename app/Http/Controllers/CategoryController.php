<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index()
    {
        $categories = Category::orderBy('sort_order')->get();
        
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Display the specified category with its products.
     */
    public function show(string $slug)
    {
        $category = Category::where('slug', $slug)
            ->firstOrFail();
            
        $products = $category->products()
            ->orderBy('created_at', 'desc')
            ->paginate(12);
            
        return Inertia::render('Categories/Show', [
            'category' => $category,
            'products' => $products
        ]);
    }

    /**
     * Get featured categories for the homepage.
     */
    public function featured()
    {
        $featuredCategories = Category::where('is_featured', true)
            ->orderBy('sort_order')
            ->take(4)
            ->get();
            
        return response()->json([
            'categories' => $featuredCategories
        ]);
    }
}