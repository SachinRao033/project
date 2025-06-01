import * as cheerio from 'cheerio';

// Define the data item type
interface DataItem {
  title: string;
  category: string;
  price: string;
  inStock: boolean;
  url: string;
  imageUrl: string;
}

// Mock data for demonstration purposes
const generateMockData = (): DataItem[] => {
  const categories = ['Electronics', 'Books', 'Clothing', 'Home & Kitchen', 'Toys'];
  const mockData: DataItem[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = (Math.random() * 100 + 10).toFixed(2);
    
    mockData.push({
      title: `Product Item ${i} - ${category}`,
      category,
      price,
      inStock: Math.random() > 0.3, // 70% chance of being in stock
      url: `https://example.com/product-${i}`,
      imageUrl: `https://picsum.photos/id/${i + 100}/200/200`,
    });
  }
  
  return mockData;
};

// Main scraping function
export const scrapeData = async (): Promise<DataItem[]> => {
  try {
    // In a real application, we would fetch and parse HTML from an actual website
    // Since we're running this in a browser environment with CORS restrictions,
    // we'll use mock data for demonstration
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, return mock data
    return generateMockData();
    
    /* Real scraping implementation would look something like this:
    
    const response = await fetch('https://example.com/products');
    const html = await response.text();
    
    const $ = cheerio.load(html);
    const products: DataItem[] = [];
    
    $('.product-item').each((i, el) => {
      const title = $(el).find('.product-title').text().trim();
      const category = $(el).find('.product-category').text().trim();
      const price = $(el).find('.product-price').text().trim().replace('$', '');
      const inStock = $(el).find('.product-availability').text().includes('In Stock');
      const url = $(el).find('a').attr('href') || '';
      const imageUrl = $(el).find('img').attr('src') || '';
      
      products.push({
        title,
        category,
        price,
        inStock,
        url,
        imageUrl,
      });
    });
    
    return products;
    */
    
  } catch (error) {
    console.error('Scraping error:', error);
    throw new Error('Failed to scrape data from the target website');
  }
};