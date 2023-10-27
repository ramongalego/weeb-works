import defaultProfileImg from '../assets/defaultProfileImageMock.png';

const Profile = () => {
  return (
    <>
      <div className='mt-20 h-72 bg-[#242538]'>
        <div className='mx-auto flex max-w-7xl items-end px-2 pt-24 sm:px-6 lg:px-8'>
          <div className='relative top-8 h-40 w-48 rounded'>
            <img
              src={defaultProfileImg}
              alt='Profile Image'
              className='h-full w-full rounded bg-white'
            />
          </div>
          <div className='relative top-2 w-full px-8 text-white'>
            <h1 className='text-2xl font-semibold'>Ankrath</h1>
          </div>
        </div>
      </div>

      <div className='mx-auto my-14 flex max-w-7xl px-2 sm:px-6 lg:px-8'>Content</div>
    </>
  );
};

export default Profile;
