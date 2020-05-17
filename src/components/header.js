import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Helmet } from 'react-helmet'
import '../assets/css/theme.css'
import '../assets/css/app.css'

const Header = (props) => (
  <Helmet>
    {props.children}
    <link href="https://fonts.googleapis.com/css?family=Prompt:400,600,700|Material+Icons&display=swap" rel="stylesheet" />
  </Helmet>
)

export default Header
