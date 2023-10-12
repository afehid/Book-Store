const event = require('events');
const Audit = require('../Model/auditModel');
const queries = require('../db/queries');
const dbConnection = require('../db/connection');

const emitter = new event.EventEmitter();
const auditEvent = 'audit';

emitter.on(auditEvent, function(audit) {
  console.log(`Audit Event Emitter - : ${JSON.stringify(audit)}`);
  try {
    const values = [
      audit.auditAction,
      JSON.stringify(audit.data),
      audit.status,
      audit.error,
      audit.auditBy,
      audit.auditOn
    ];
    const auditQuery = queries.queryList.AUDIT_QUERY;
    dbConnection.dbQuery(auditQuery, values);
  } catch (error) {
    console.log(`Audit Error`);
  }
});

exports.prepareAudit = function(auditAction, data, error, auditBy, auditOn) {
  let status;
  if (error) status = 500;
  status = 200;
  const auditObj = new Audit.Audit(
    auditAction,
    data,
    status,
    error,
    auditBy,
    auditOn
  );
  emitter.emit(auditEvent, auditObj);
};
