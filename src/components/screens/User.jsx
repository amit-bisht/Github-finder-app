import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Spinner from '../UI/Spinner'
import ReposList from '../repos/ReposList'
import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../../store/user-context'


function User() {
  const params = useParams()
  const ctx = useContext(UserContext)
  useEffect(() => {
    ctx.getUserDetial(params.username)
    ctx.getRepos(params.username)
  }, [])
  // const {name,type,avtar_url,location,bio,blog,twitter_username,login,html_url,followers,following,public_repos,public_gists,hireable}=ctx.user
  return (
    <>
      {ctx.isSingleUserLoading ? <Spinner /> : <div className="w-full mx-auto lg:w-10/12">
        <div className="mb-4">
          <Link to="/" className='btn btn-ghost'>
            Back to Search
          </Link>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className="rounded-lg shadow-xl card image-full">
              <figure>
                <img src={ctx.user.avatar_url} alt="userimage" />
              </figure>
              <div className="card-body justify-end">
                <h2 className="card-title mb-0">
                  {ctx.user.name}
                </h2>
                <p>{ctx.user.login}</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl card-title">
                {ctx.user.name}
                <div className="ml-2 mr-1 badge badge-success">
                  {ctx.user.type}
                </div>
                {ctx.user.hireable && <div className='mx-1 badge badge-info'>Hireable</div>}
              </h1>
              <p>{ctx.user.bio}</p>
              <div className="mt-4 card-actions">
                <a href={ctx.user.html_url} className="btn btn-outline" target="_blank" rel="noreferrer">
                  Visit Github Profile
                </a>
              </div>
            </div>
            <div className="w-full rounded-lg shadow-md bg-base-100 stats">
              {ctx.user.location && (
                <div className="stat">
                  <div className="stat-title text-md">
                    Location
                  </div>
                  <div className="text-lg stat-value">{ctx.user.location}</div>
                </div>
              )}
              {ctx.user.blog && (
                <div className="stat">
                  <div className="stat-title text-md">
                    Website
                  </div>
                  <div className="text-lg stat-value">
                    <a href={`https://${ctx.user.blog}`} target="_blank" rel='noreferrer'>{ctx.user.blog}</a>
                  </div>
                </div>
              )}
              {ctx.user.twitter_username && (
                <div className="stat">
                  <div className="stat-title text-md">
                    Twitter
                  </div>
                  <div className="text-lg stat-value">
                    <a href={`https://twitter.com/${ctx.user.twitter_username}}`} target="_blank" rel='noreferrer'>{ctx.user.twitter_username}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className='text-3xl md:text-5xl'></FaUsers>
            </div>
            <div className="stat-title pr-5">
              Followers
            </div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">
              {ctx.user.followers}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUserFriends className='text-3xl md:text-5xl'></FaUserFriends>
            </div>
            <div className="stat-title pr-5">
              Following
            </div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">
              {ctx.user.following}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaCodepen className='text-3xl md:text-5xl'></FaCodepen>
            </div>
            <div className="stat-title pr-5">
              Public Repos
            </div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">
              {ctx.user.public_repos}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaStore className='text-3xl md:text-5xl'></FaStore>
            </div>
            <div className="stat-title pr-5">
              Public Gists
            </div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">
              {ctx.user.public_gists}
            </div>
          </div>
        </div>
        <ReposList repos={ctx.repos}/>
      </div>}
    </>
  )
}

export default User