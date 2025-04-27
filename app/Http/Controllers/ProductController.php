<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index(Request $request)
    {
        $query = Product::with('category');
        
        // Filter by category
        if ($request->has('category')) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }
        
        // Filter by price range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }
        
        // Filter by new arrivals
        if ($request->has('new') && $request->new) {
            $query->where('is_new', true);
        }
        
        // Filter by sale items
        if ($request->has('sale') && $request->sale) {
            $query->where('is_on_sale', true);
        }
        
        // Sort products
        $sortBy = $request->sort ?? 'created_at';
        $sortOrder = $request->order ?? 'desc';
        
        $allowedSortFields = ['created_at', 'price', 'name'];
        if (in_array($sortBy, $allowedSortFields)) {
            $query->orderBy($sortBy, $sortOrder);
        }
        
        $products = $query->paginate(12)->withQueryString();
        $categories = Category::orderBy('name')->get();
        
        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['category', 'min_price', 'max_price', 'new', 'sale', 'sort', 'order']),
        ]);
    }
    
    /**
     * Display the specified product.
     */
    public function show(string $slug)
    {
        $product = Product::with('category')
            ->where('slug', $slug)
            ->firstOrFail();
            
        // Get related products from the same category
        $relatedProducts = Product::with('category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();
            
        return Inertia::render('Products/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}