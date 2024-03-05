import React from 'react'
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useListenMessages from '../../hooks/useListenMessages';
function Home() {
  useListenMessages();
  return (
    <div className='flex '>
			<Sidebar />
			<MessageContainer />
		</div>
  )
}

export default Home