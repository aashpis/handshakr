// Data Transfer Objects
// 
'use server' 

import 'server-only'
import {API} from './definitions'
import axiosInstance from "./axiosInstance";

// edit user profile data
export async function editUser({}){

}


// 
export async function createHandshake(handshakeData: {}){
    try {
        const response = await axiosInstance.post(API.HANDSHAKE.CREATE, handshakeData);
        return { success: true, data: response.data };
      } catch (error: any) {
        return { success: false, error: error.response?.data?.message || "Failed to get profile" }; 
      }
    }



export async function acceptHandshake(handshakeId: string){
    try {
        const response = await axiosInstance.post(API.HANDSHAKE.ACCEPT, handshakeId);
        return { success: true, data: response.data };
      } catch (error: any) {
        return { success: false, error: error.response?.data?.message || "failed to accept handshake" }; 
      }
}

export async function rejectHandshake(handshakeId: string){
    try {
        const response = await axiosInstance.post(API.HANDSHAKE.REJECT, handshakeId);
        return { success: true, data: response.data };
      } catch (error: any) {
        return { success: false, error: error.response?.data?.message || "failed to reject handshake" }; 
      }
}

