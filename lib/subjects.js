Evaluation = new SimpleSchema({
  name: {
    type: String,
    unique: true,
    sparse: true
  }
})

EvaluationInstance = new SimpleSchema({
  evaluation: {
    type: Evaluation,
    unique: true,
    sparse: true
  },
  calification: {
    type: Number,
    min: 2,
    max: 10
  }
})

Student = new SimpleSchema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  idNumber: {
    type: String,
    regEx: /^[0-9]+$/,
    unique: true,
    sparse: true
  },
  approvalStatus: {
    type: String,
    allowedValues: ['Coursing', 'Can be Signed', 'Signed', 'Quitted'],
    defaultValue: 'Coursing'
  },
  legalStatus: {
    type: String,
    allowedValues: ['Enrolled', 'Auditing']
  },
  teacherCandidate: {
    type: Boolean,
    defaultValue: false
  },
  evaluationInstances: {
    type: [EvaluationInstance],
    defaultValue: []
  }
})

Course = new SimpleSchema({
  code: {
    type: String
  },
  year: {
    type: Number,
    min: 2000,
    max: 2099
  },
  quarter: {
    type: String,
    allowedValues: ['C1', 'C2', 'Annual']
  },
  open: {
    type: Boolean,
    defaultValue: true
  },
  students: {
    type: [Student],
    defaultValue: []
  }
})

Subject = new SimpleSchema({
  name: {
    type: String,
    listable: true
  },
  code: {
    type: String,
    unique: true,
    listable: true
  },
  courses: {
    type: [Course],
    defaultValue: []
  }
})

Subjects = new Mongo.Collection('subjects')
Subjects.attachSchema(Subject)
Subjects.helpers({
  delete: function() {
    Subjects.remove(this._id, {tx: true})
    Alert.success('The element was successfully deleted.', true)
  }
})