import PostModel from '@/resources/post/post.model';
import IPost from '@/resources/post/post.interface';

class PostService {
    private post = PostModel;

    /**
     * Create a new post
     */
    public async create(title: string, body: string): Promise<IPost> {
        try {
            const post = await this.post.create({ title, body });

            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }

    /**
     * Get all posts
     */

    public async getAll(): Promise<IPost[]> {
        try {
            const posts = await this.post.find();

            return posts;
        } catch (error) {
            throw new Error('Unable to get posts');
        }
    }

    /**
     * Get a post by id
     * @param id
     */
}

export default PostService;
