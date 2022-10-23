import axios from 'axios'
import cookie from 'cookie'

export default async (req, res) => {

  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      console.log('21288')
      const response = await axios.post(`${process.env.API_URL}/api/token/`,
        {
          username,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      console.log(1224, response)
      if (response.data.access) {
        res.setHeader('Set-Cookie', [
          cookie.serialize('access', response.data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 15,
            sameSite: 'Lax',
            path: '/'
          })
        ])

        return res.status(200).json({
          success: true
        })
      } else {
        console.log('121')
        return res.status(response.status).json({
          error: 'Authentication failed'
        })
      }

    } catch (error) {
      res.status(error.response.status).json({
        error: error.response && error.response.data.error
      })
    }
  }
}