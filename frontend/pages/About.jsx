import React from 'react'
import Title from '../components/Title'
import { assets } from '../src/assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full max-w-[450px]' src={assets.about_img} alt="" srcset="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad dolor molestias natus modi accusantium, eligendi pariatur vero enim ducimus nesciunt, fuga aut cumque error recusandae placeat iste fugiat, minus necessitatibus praesentium optio laboriosam perspiciatis saepe. Praesentium minus nesciunt saepe hic possimus quo illo soluta tempore facilis, voluptatibus neque ut. Ipsum.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, praesentium possimus dolor nobis id iste iusto velit laboriosam tenetur reprehenderit minima nihil modi ratione culpa, veritatis ab accusamus quas suscipit similique ullam temporibus perspiciatis iure! Odio iusto sunt omnis dignissimos quo id laborum, nemo quae rerum, quos, commodi architecto nulla!</p>
        <b>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque odio, itaque similique ipsam repellendus mollitia fugit veniam recusandae, in dicta quas nostrum. Explicabo, eos nulla doloremque veritatis quas porro possimus? Animi, delectus!</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perspiciatis nam, quisquam voluptatem cumque est sit corrupti id maiores pariatur.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perspiciatis nam, quisquam voluptatem cumque est sit corrupti id maiores pariatur.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perspiciatis nam, quisquam voluptatem cumque est sit corrupti id maiores pariatur.</p>
        </div>
      </div>

      <NewsLetterBox/>
    </div>
  )
}

export default About
