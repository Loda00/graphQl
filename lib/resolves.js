const { Pool } = require('pg')
require('dotenv').config()
const { host, user, database, password, port } = process.env

const connect = {
  host,
  user,
  database,
  password,
  port,
}

class Course {
  constructor() {
    this.instance = undefined
    this.pool = new Pool(connect)
  }

  connection() {
    if (this.instance === undefined) {
      this.instance = new Pool(connect)
    }
  }

  async getCourse(id) {
    this.connection()

    const cli = await this.instance.connect()
    
    let resolve;

    const sql = `select * from course where id = ${id}`

    try {
      resolve = await cli.query(sql)
      await cli.query('COMMIT')
    } catch (e) {
      await cli.query('ROLLBACK')
      throw new Error(e)
    }

    return resolve;
  }
}

const courses = [
  {
    _id: '1',
    title: 'My title',
    teacher: 'My Teacher',
    description: 'once description',
    topic: 'programación'
  },
  {
    _id: '2',
    title: 'My title',
    teacher: 'My Teacher',
    description: 'once description',
    topic: 'diseño'
  },
  {
    _id: '3',
    title: 'My title',
    teacher: 'My Teacher',
    description: 'once description',
    topic: 'mecatronica'
  }
]

const resolvers = {
  Query: {
    getCourses: () => {
      return courses
    },
    getCourse: (root, args) => {
      const course = courses.find(course => course._id === args.id)
      return course
    },
    saludo: () => {
      return 'Buenos días a todos !'
    }
  }
}

module.exports = {
  resolvers
}