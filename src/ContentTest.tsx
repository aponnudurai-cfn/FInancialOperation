import { useEffect, useState } from 'react';
import { createClient, Entry, EntrySkeletonType } from 'contentful';

// ✅ Define your field shape
type PostFields = {
  title: string;
  slug: string;
  PostBody: string;
};

// ✅ Wrap in EntrySkeletonType to satisfy constraint
type PostSkeleton = EntrySkeletonType<PostFields>;

const client = createClient({
  space: 'vt5x1g3hgl6j',
  accessToken: 'ukyCeeBKwRsESNJjnm2wDH3TugOud1goy_tcwkgj-GE',
});

export default function ContentTest() {
  // ✅ Use Entry<PostSkeleton>[] for state
  const [posts, setPosts] = useState<Entry<PostSkeleton>[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const entries = await client.getEntries<PostSkeleton>();
        setPosts(entries.items);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div key={post.sys.id} style={{ marginBottom: '1rem' }}>
            <h3>{post.fields.slug}</h3>
            <p>{post.fields.title}</p>
          </div>
        ))
      )}
    </div>
  );
}
