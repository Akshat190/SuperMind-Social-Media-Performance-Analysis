from datetime import datetime, timedelta
import random
import uuid
import pandas as pd

def generate_mock_data(num_posts=5000):
    post_types = ['carousel', 'reel', 'static_image']
    data = []

    # Start date - 30 days ago
    start_date = datetime.now() - timedelta(days=30)

    # Generate post IDs and shuffle them
    post_ids = list(range(1, num_posts + 1))
    random.shuffle(post_ids)

    for i in range(num_posts):
        post = {
            '_id': str(uuid.uuid4()),
            'post_id': post_ids[i],
            'post_type': random.choice(post_types),
            'posted_at': (start_date + timedelta(days=random.randint(0, 30))).isoformat(),
            'likes': random.randint(50, 1000),
            'shares': random.randint(10, 200),
            'comments': random.randint(5, 100),
            'views': random.randint(1000, 10000),
            'save_count': random.randint(5, 50)
        }
        data.append(post)

    return data

def main():
    try:
        # Generate mock data
        print("Generating mock data...")
        mock_data = generate_mock_data(5000)

        # Save to CSV
        df = pd.DataFrame(mock_data)
        output_file = "mock_data.csv"
        df.to_csv(output_file, index=False)

        print("\nSample of generated data:")
        print(df.head())

        print(f"\nTotal records generated: {len(mock_data)}")
        print(f"Data saved to {output_file}")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()
