import React, {Fragment } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { NavItem,
  Form,
  FormGroup,
  Input,
  Button } from 'reactstrap'
import { Link } from 'react-router-dom'

library.add(faSearch)

const SearchBar = ({query, onChangeQuery, onSearch}) => (
  <Form onSubmit={onSearch} className="form-inline my-2 my-lg-0">
    <FormGroup>
      <Input
        autoFocus
        value={query}
        onChange={onChangeQuery}
        className="form-control rounded-0"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <Button className="rounded-0 btn my-2 my-sm-0 btn-outline-light" type="submit">
        <FontAwesomeIcon
          title="Search"
          color='black'
          icon={['fas', 'search']}
        />
      </Button>
    </FormGroup>
  </Form>
)

export default SearchBar
