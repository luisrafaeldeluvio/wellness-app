// "https://world.openfoodfacts.net/api/v2/product/3017624010701?fields=product_name,nutriments",
// "https://world.openfoodfacts.net/cgi/search.pl?search_terms=banania&search_simple=1&action=process&json=1&page_size=20&page=1&fields=product_name,nutriments&app_name=wellnessapp&app_version=1.0",

import type { FoodItem } from "../db";

const OPENFOODFACTS_API_URL = "https://world.openfoodfacts.net";

const OPENFOODFACTS_FIELDS = [
  "code",
  "product_name",
  "serving_size",
  "energy-kcal_100g",
  "proteins_100g",
  "carbohydrates_100g",
  "sugars_100g",
  "fat_100g",
  "saturated-fat_100g",
  "fiber_100g",
  "sodium_100g",
];

const OPENFOODFACTS_IDENTITY = {
  app_name: "wellnessapp",
  app_version: "1.0",
  contact: "wellnessapp-off@lrrd.anonaddy.com",
};

interface BarCodeResponse {
  code: string;
  status: number;
  status_verbose: string;
  product: {
    product_name: string;
    serving_size: string;
    "energy-kcal_100g": number;
    proteins_100g?: number;
    carbohydrates_100g?: number;
    sugars_100g?: number;
    fat_100g?: number;
    "saturated-fat_100g"?: number;
    fiber_100g?: number;
    sodium_100g?: number;
  };
}

interface SearchResponse {
  count: number;
  page: string;
  page_count: number;
  page_size: number;
  products: {
    code: string;
    product_name: string;
    serving_size: string;
    "energy-kcal_100g": number;
    proteins_100g?: number;
    carbohydrates_100g?: number;
    sugars_100g?: number;
    fat_100g?: number;
    "saturated-fat_100g"?: number;
    fiber_100g?: number;
    sodium_100g?: number;
  }[];
  skip: number;
}

interface FoodBarCodeParams {
  barcode: string;
}

interface FoodSearchParams {
  searchTerm: string;
  options?: {
    pageSize?: number;
    pageNumber?: number;
  };
}

const apiParams = new URLSearchParams({
  fields: OPENFOODFACTS_FIELDS.join(","),
  ...OPENFOODFACTS_IDENTITY,
});

export async function getFoodBarCodeResult(barcode: string) {
  try {
    const response = await fetch(
      `${OPENFOODFACTS_API_URL}/api/v2/product/${barcode}?${apiParams.toString()}`,
    );

    const item: BarCodeResponse = await response.json();

    const food: FoodItem = {
      name: item.product.product_name,
      code: item.code,
      serving_size: item.product.serving_size,
      nutriments: {
        "energy-kcal_100g": item.product["energy-kcal_100g"],
        proteins_100g: item.product.proteins_100g,
        carbohydrates_100g: item.product.carbohydrates_100g,
        sugars_100g: item.product.sugars_100g,
        fat_100g: item.product.fat_100g,
        "saturated-fat_100g": item.product["saturated-fat_100g"],
        fiber_100g: item.product.fiber_100g,
        sodium_100g: item.product.sodium_100g,
      },
    };
    return food;
  } catch (e) {
    console.error(e);
  }
}

export async function getFoodSearchResults({
  searchTerm,
  options = {
    pageSize: 10,
    pageNumber: 1,
  },
}: FoodSearchParams) {
  try {
    const response = await fetch(
      `${OPENFOODFACTS_API_URL}/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&json=1&page_size=${options.pageSize}&page=${options.pageNumber}&${apiParams.toString()}`,
    );

    const searchResult: SearchResponse = await response.json();

    const foods: FoodItem[] = Object.values(searchResult.products).map(
      (item) => {
        return {
          name: item.product_name,
          code: item.code,
          serving_size: item.serving_size,
          nutriments: {
            "energy-kcal_100g": item["energy-kcal_100g"],
            proteins_100g: item.proteins_100g,
            carbohydrates_100g: item.carbohydrates_100g,
            sugars_100g: item.sugars_100g,
            fat_100g: item.fat_100g,
            "saturated-fat_100g": item["saturated-fat_100g"],
            fiber_100g: item.fiber_100g,
            sodium_100g: item.sodium_100g,
          },
        };
      },
    );

    return foods;
  } catch (e) {
    console.error(e);
    return [];
  }
}
