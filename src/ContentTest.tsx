import { useEffect, useState } from 'react';
import { createClient, Entry, EntrySkeletonType } from 'contentful';
import { fetchAuthSession } from 'aws-amplify/auth';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

// ✅ Define your field shape
type PostFields = {
  title: string;
  slug: string;
  postBody: string;
};

// ✅ Wrap in EntrySkeletonType to satisfy constraint
type PostSkeleton = EntrySkeletonType<PostFields, 'blogPost'>;

const client = createClient({
  space: 'vt5x1g3hgl6j',
  accessToken: 'ukyCeeBKwRsESNJjnm2wDH3TugOud1goy_tcwkgj-GE',
});
const clientT = generateClient<Schema>();

export default function ContentTest() {
  // ✅ Use Entry<PostSkeleton>[] for state
  const [posts, setPosts] = useState<Entry<PostSkeleton>[]>([]);

  const echo = async () => {
          const session = await fetchAuthSession();
          const token = session.tokens?.idToken?.toString() ?? null;
          console.log("token:", token);
  
          const response = await clientT.queries.echo({ content: "Hello, Amplify!" });
          console.log("Echo response:", response);
      };

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
            <h3>{post.fields.slug as unknown as string}</h3>
            <p>{post.fields.title as unknown as string}</p>
            <p>{post.fields.postBody as unknown as string}</p>
          </div>
        ))
      )}
      <button onClick={echo}>+ Just echo now</button>
    </div>
  );
}
