import React from 'react'
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
function Home() {
  return (
    <div className='flex '>
			<Sidebar />
			<MessageContainer />
		</div>
  )
}

export default Home