import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(null)
  const [applied, setApplied] = useState(null)
  const [error, setError] = useState(null);

  const router = useRouter();

  //upload resume
  const uploadResume = async (
    formData,
    access_token
  ) => {
    try {
      setLoading(true)

      const res = await axios.put(
        `${process.env.API_URL}/api/upload/resume/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
      if (res.data) {
        setLoading(false)
        setUploaded(true)
      }

    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
        (error.response.data.detail || error.response.data.error)
      )
    }
  }
  
  return (
    <JobContext.Provider
      value={{
        loading,
        user,
        error,
        updated,
        setUpdated,
        clearErrors
      }}
    >
      {children}
    </JobContext.Provider>
  )

}

export default JobContext