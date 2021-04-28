import axios from 'axios'; // used to make api calls

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);