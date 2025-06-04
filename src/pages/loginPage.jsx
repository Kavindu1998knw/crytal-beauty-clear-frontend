export default function LoginPage() {
  return (
    <div className="w-full h-screen bg-[url('./login-bg.jpg')] bg-cover bg-center flex">
      <div className="w-1/2 h-full"></div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="w-[450px] h-[400px] shadow-lg backdrop-blur-sm rounded-xl flex flex-col justify-center items-center">
            <input type="email" name="email" id="email" placeholder="Email" className="w-[400px] h-[50px] rounded-xl border-2 border-gray-300 m-2 p-2 text-white" />
            <input type="password" name="password" id="password" placeholder="Password" className="w-[400px] h-[50px] rounded-xl border-2 border-gray-300 m-2 p-2 text-white" />
            <button className="w-[400px] h-[50px] rounded-xl bg-blue-500 text-white m-2 p-2 cursor-pointer">Login</button>
        </div>
      </div>
    </div>
  );
}
