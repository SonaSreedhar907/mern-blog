export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
        <img
            src="https://firebasestorage.googleapis.com/v0/b/mern-blog-test-8ff4d.appspot.com/o/1715103018634profile-pic.jpeg?alt=media&token=db4cab25-de3b-4fce-863f-9f74b5db927a"
            className="w-32 h-32 rounded-full mx-auto mb-5 shadow-md border-4 border-white hover:border-purple-500 transition duration-300" 
            alt="Profile Picture" 
          />
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Sona's Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to Sona's Blog! This blog was created by Sona Sreedhar
              as a personal project to share his thoughts and ideas with the
              world. Sona is a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Sona is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}