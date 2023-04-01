import React from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'

export default function TeamCard() {
    const Card = styled.div`
    width: 50%;
    height: 100%;
    margin: 2rem;
    border-radius: 10px;
`
    const Team = [
        { name: "Tom Vacherat", surnom: "Tom-Tom", title: "Backend developper & solution architect", school: "42 Paris", xp: "2y+ backend dev", src: "" },
        { name: "Eric Djavid", surnom: "Rico", title: "3D experience developper", school: "42 Paris, Rennes School of Business", xp: "5y+ dev & project management, 3 companies founded", src: "" },
    ]

    return (
        <>
            {Team.map((e) => (
                <div className='flex flex-row align-middle justify-center' key={e.name}>
                    <Card>
                            <div className="p-2 md:p-10 m-2 md:m-10 shadow-xl bg-stone-900 bg-opacity-60 rounded-md">
                                <div className="p-2 photo-wrapper">
                                    {/* <Image width={200} height={200} className="pt-2 md:pt-0 mx-auto mt-2 rounded-full" src={e.src} alt={e.name} placeholder="blur" /> */}
                                </div>
                                <div className="p-2">
                                    <h3 className="text-2xl md:text-4xl font-medium text-center text-white leading-8">{e.name}</h3>
                                    <div className="text-xs md:text-xl font-semibold text-center text-gray-400">
                                        <p>{e.title}</p>
                                    </div>

                                    <div className="my-3 text-center">
                                        <a className="text-xs md:text-lg italic font-medium text-indigo-500 ">&quot;{e.surnom}&quot;</a>
                                    </div>
                                    <table className="my-3 text-xs md:text-xl">
                                        <tbody><tr>
                                            <td className="px-2 py-2 font-semibold text-gray-500">Experience</td>
                                            <td className="px-2 py-2">{e.xp}</td>
                                        </tr>
                                            <tr>
                                                <td className="px-2 py-2 font-semibold text-gray-500">School</td>
                                                <td className="px-2 py-2">{e.school}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-2 py-2 font-semibold text-gray-500">Email</td>
                                                <td className="px-2 py-2">edjavid@student.42.fr</td>
                                            </tr>
                                        </tbody></table>


                                </div>
                            </div>
                    </Card>

                </div>
            ))}
        </>

    )
}