import { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import AddStory from "../../components/modals/addStory"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { getImage } from "utils/fileManipulation"
import { StoriesSkeleton } from "./Skeleton"
import { useGetStories } from "queries/stories/queries"
import "swiper/css"
import "swiper/css/navigation"
import "./stories.scss"

const Stories = () => {
  const { currentUser } = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)

  const { data: stories, isLoading, isError } = useGetStories()

  if (isLoading) return <StoriesSkeleton />

  if (isError) return <StoriesSkeleton />

  return (
    <div className="stories">
      <div className="story add-story">
        <img src={getImage(currentUser.profilePic)} alt="" />
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
      >
        {stories?.map((story) => (
          <SwiperSlide className="story" key={story.id}>
            <img src={story.img} alt="" />
            <span>{story.user.name}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Stories
