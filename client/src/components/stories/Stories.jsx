import { useContext, useState } from "react"
import "./stories.scss"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext"
import AddStory from "../../components/modals/addStory"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

const Stories = ({ userId }) => {
  const { currentUser } = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)

  const {
    isLoading,
    isError,
    data: stories,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: () =>
      makeRequest.get("/stories?userId=" + userId).then((res) => res.data),
  })

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>Something went wrong</h1>

  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button onClick={() => setOpenModal(true)}>+</button>
      </div>
      {openModal && (
        <AddStory setOpenUpdate={setOpenModal} userId={currentUser.id} />
      )}
      <Swiper
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
        spaceBetween={20}
        slidesPerView={5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {stories?.map((story) => (
          <SwiperSlide className="story" key={story.id}>
            <img src={"/upload/" + story.img} alt="" />
            <span>{story.name}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Stories
