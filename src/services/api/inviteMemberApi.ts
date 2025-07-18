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

export const acceptInvitation = async (token: string, invitationId: string) => {
  console.log('🔑 Sending token:', token);
  try {
    const res = await axios.post(
      `/member/invitation/${invitationId}/accept`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('✅ Accept invitation response:', res.data);
    return res.data.data;
  } catch (err: any) {
    console.error('❌ Error in acceptInvitation:', err);
    console.log('🔥 err.response:', err?.response?.data);
    throw err;
  }
};

export const declineInvitation = async (token: string, invitationId: string) => {
  console.log('🔑 Sending token:', token);
  try {
    const res = await axios.post(
      `/member/invitation/${invitationId}/decline`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('✅ Decline invitation response:', res.data);
    return res.data.data;
  } catch (err: any) {
    console.error('❌ Error in declineInvitation:', err);
    console.log('🔥 err.response:', err?.response?.data);
    throw err;
  }
};

export const removeMember = async (token: string, homeId: string, memberId: string) => {
  console.log('🔑 Sending token:', token);
  try {
    const res = await axios.delete(
      `/member/${homeId}/removemember/${memberId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('✅ Remove member response:', res.data);
    return res.data.data;
  } catch (err: any) {
    console.error('❌ Error in removeMember:', err);
    console.log('🔥 err.response:', err?.response?.data);
    throw err;
  }
};

