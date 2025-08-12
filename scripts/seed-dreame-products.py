import os
from supabase import create_client, Client

# Supabase URL and Service Key from environment variables
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("Error: SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables are not set.")
    print("Please set them in your Vercel project settings.")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Product data from lib/dreame-products.ts (converted to Python dictionary)
# This data should ideally be loaded from a JSON or similar format for larger datasets
# For this example, we'll hardcode a few items based on the previous context.
# In a real application, you might read this from a JSON file or a more robust source.
products_data = [
    {
        "id": "dreame-l20-ultra",
        "name": "Dreame L20 Ultra Robot Süpürge",
        "category": "robot-supurge",
        "brand": "Dreame",
        "image": "/images/dreame-l20-ultra.webp",
        "description": "Otomatik paspas temizleme ve kurutma, 7000Pa emiş gücü, akıllı navigasyon.",
        "price": 25000,
        "features": [
            "MopExtend™ Teknolojisi",
            "DuoScrub™ Paspas Sistemi",
            "Otomatik Toz Boşaltma",
            "Otomatik Paspas Yıkama ve Kurutma",
            "AI Destekli Engel Tanıma"
        ]
    },
    {
        "id": "dreame-x20-pro",
        "name": "Dreame X20 Pro Robot Süpürge",
        "category": "robot-supurge",
        "brand": "Dreame",
        "image": "/images/dreame-x20-pro.webp",
        "description": "Yüksek performanslı robot süpürge, gelişmiş haritalama ve temizlik.",
        "price": 22000,
        "features": [
            "Otomatik Paspas Kaldırma",
            "Yüksek Emiş Gücü",
            "3D Engel Tanıma",
            "Lazer Navigasyon"
        ]
    },
    {
        "id": "dreame-h12-pro",
        "name": "Dreame H12 Pro Dikey Süpürge",
        "category": "dikey-supurge",
        "brand": "Dreame",
        "image": "/images/dreame-h12-pro.webp",
        "description": "Islak ve kuru temizlik yapabilen güçlü dikey süpürge.",
        "price": 12000,
        "features": [
            "Kenar Temizliği",
            "Otomatik Kendi Kendini Temizleme",
            "Gerçek Zamanlı Sesli Uyarılar",
            "Uzun Pil Ömrü"
        ]
    },
    {
        "id": "dreame-hair-glory",
        "name": "Dreame Hair Glory Saç Kurutma Makinesi",
        "category": "sac-bakim",
        "brand": "Dreame",
        "image": "/images/dreame-hair-glory.webp",
        "description": "Hızlı ve nazik kurutma için yüksek hızlı saç kurutma makinesi.",
        "price": 4500,
        "features": [
            "Hızlı Kurutma",
            "Negatif İyon Teknolojisi",
            "Akıllı Sıcaklık Kontrolü",
            "Hafif Tasarım"
        ]
    },
    {
        "id": "dreame-air-purifier",
        "name": "Dreame Hava Temizleyici",
        "category": "temizlik-urunleri",
        "brand": "Dreame",
        "image": "/images/dreame-air-purifier.webp",
        "description": "Eviniz için temiz hava sağlayan akıllı hava temizleyici.",
        "price": 7000,
        "features": [
            "HEPA Filtre",
            "Akıllı Sensörler",
            "Düşük Gürültü",
            "Uygulama Kontrolü"
        ]
    },
    {
        "id": "dreame-mop-pads",
        "name": "Dreame Paspas Pedleri (Yedek)",
        "category": "aksesuarlar",
        "brand": "Dreame",
        "image": "/images/dreame-mop-pads.webp",
        "description": "Dreame robot süpürgeler için orijinal yedek paspas pedleri.",
        "price": 500,
        "features": [
            "Yüksek Kaliteli Mikrofiber",
            "Kolay Değişim",
            "Yıkanabilir ve Yeniden Kullanılabilir"
        ]
    }
]

def seed_products():
    print("Attempting to seed products into Supabase...")
    for product in products_data:
        try:
            # Check if product already exists to avoid duplicates
            response = supabase.table('products').select('id').eq('id', product['id']).execute()
            if response.data:
                print(f"Product with ID {product['id']} already exists. Updating...")
                # Update existing product
                update_response = supabase.table('products').update(product).eq('id', product['id']).execute()
                if update_response.data:
                    print(f"Successfully updated product: {product['name']}")
                else:
                    print(f"Failed to update product {product['name']}: {update_response.error}")
            else:
                print(f"Product with ID {product['id']} does not exist. Inserting...")
                # Insert new product
                insert_response = supabase.table('products').insert(product).execute()
                if insert_response.data:
                    print(f"Successfully inserted product: {product['name']}")
                else:
                    print(f"Failed to insert product {product['name']}: {insert_response.error}")
        except Exception as e:
            print(f"An error occurred while processing product {product.get('name', 'Unknown')}: {e}")
    print("Product seeding process completed.")

if __name__ == "__main__":
    seed_products()
