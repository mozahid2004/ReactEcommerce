import axios from 'axios';

const API = 'http://localhost:5000/api/admin/users';
const getHeaders = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const fetchAllUsers = (token) => axios.get(API, getHeaders(token));
export const updateUserTags = (id, tags, token) => axios.put(`${API}/${id}/tags`, { tags }, getHeaders(token));
export const toggleNewsletter = (id, token) => axios.put(`${API}/${id}/newsletter`, {}, getHeaders(token));
export const updateNotes = (id, notes, token) => axios.put(`${API}/${id}/notes`, { notes }, getHeaders(token));
