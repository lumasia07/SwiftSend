import { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await fetch('https://05ee-154-159-237-210.ngrok-free.app/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch profile');
        }

        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Details</h2>
        
        {profile && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Account Information</h3>
              <p className="text-gray-600">
                <span className="font-medium">Username:</span> {profile.username}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Wallet Details</h3>
              <div className="space-y-2">
                <p className="text-gray-600 break-all">
                  <span className="font-medium">Public Key:</span> {profile.public_key}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">XLM Balance:</span> {profile.xlm_balance} XLM
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Account Status</h3>
              <p className="text-gray-600">
                <span className="font-medium">Last Modified:</span>{' '}
                {new Date(profile.last_modified).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;