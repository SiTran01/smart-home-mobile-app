import axios from '../axiosInstance';

interface InviteMemberInput {
  homeId: string;
  email: string;
  alias?: string;
  role: 'admin' | 'member';
  message?: string;
}

export const inviteMember = async (token: string, data: InviteMemberInput) => {
  console.log('🔑 Sending token:', token);
  try {
    const res = await axios.post(
      `/member/${data.homeId}/invite`,
      {
        email: data.email,
        alias: data.alias,
        role: data.role,
        message: data.message,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('✅ Invite member response:', res.data);
    return res.data.data;
  } catch (err: any) {
    console.error('❌ Error in inviteMember:', err);
    console.log('🔥 err.response:', err?.response?.data);
    throw err;
  }
};

