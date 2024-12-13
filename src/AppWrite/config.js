import conf from "../Conf/config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    Databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteProjectId);

            this.Databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, image, status, userId}) {
        try {
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    image,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error;
        }
    
    }
    async updatePost(slug,{title, content, image, status}) {
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            return await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.Databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error;
        }
    }

    async getPost(queries= [Query.equal('status', 'active')]) {
        try {
            return await this.Databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            throw error;
        }
    }

    async uploadImage(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(), 
                file
            )
        } catch (error) {
            throw error;
        }
    }

    async deleteFIle(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            return error
        }
    }

    getFile(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }


}

const service= new Service();
export default service