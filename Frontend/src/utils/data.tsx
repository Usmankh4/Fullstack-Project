import "server-only";

export async function fetchProductsByCategory(brand, currentPage){ 
    const response = await fetch(`http://localhost:8000/myapp/api/products/?brand=${brand}&page=${currentPage}`);
    return response;

}