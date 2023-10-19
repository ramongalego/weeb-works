import defaultProfileImg from '../assets/defaultProfileImageMock.png';

const Profile = () => {
  return (
    <>
      <div className='h-72 bg-[#242538]'>
        <div className='pt-24 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex items-end'>
          <div className='relative top-8 w-48 h-40 rounded'>
            <img
              src={defaultProfileImg}
              alt='Profile Image'
              className='w-full h-full rounded bg-white'
            />
          </div>
          <div className='px-8 w-full text-white relative top-2'>
            <h1 className='text-2xl font-semibold'>Ankrath</h1>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-14 flex'>Content</div>
    </>
  );
};

export default Profile;
