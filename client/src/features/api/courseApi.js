import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 

const COURSE_API="http://localhost:8080/api/v1/course"

export const courseApi=createApi({
    reducerPath:"courseApi",
    tagTypes:['Refech_Creater_Course'],
    baseQuery:fetchBaseQuery({
        baseUrl:COURSE_API,
        credentials:"include"
    }),
    endpoints:(builder)=>({
        createCourse:builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: "",
                method: "POST",
                body: { courseTitle, category },
            }),
            invalidatesTags:["Refech_Creater_Course"],
        }),
        getCreatorCourse: builder.query({
            query: () => ({
              url: "",
              method: "GET",
            }),
            providesTags:['Refech_Creater_Course'],
        }),
    })
})

export const {useCreateCourseMutation,useGetCreatorCourseQuery}=courseApi