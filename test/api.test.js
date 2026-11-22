import assert from 'node:assert';
import jwt from 'jsonwebtoken';
import { complaints, institutions, notifications, dashboardStats } from '../src/data/mockData.js';

console.log('=============================================================');
console.log('🌐  AICTE PS 264 — API & CLIENT DATA CONTRACT VERIFICATION');
console.log('=============================================================');

let count = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    count++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    process.exit(1);
  }
}

console.log('\n--- Test Suite 1: Mock Data Consistency & Schemas ---');
test('Mock complaints have all required statutory fields', () => {
  assert.ok(complaints.length > 0);
  for (const c of complaints) {
    assert.ok(c.id, 'Complaint must have id');
    assert.ok(c.complaintNumber, 'Complaint must have complaintNumber');
    assert.ok(c.institutionId, 'Complaint must have institutionId');
    assert.ok(c.category, 'Complaint must have category');
    assert.ok(c.department, 'Complaint must have department/bureau');
    assert.ok(c.status, 'Complaint must have status');
  }
});

test('Mock institutions registry matches verified schema', () => {
  assert.ok(institutions.length > 0);
  for (const inst of institutions) {
    assert.ok(inst.id, 'Institute must have id');
    assert.ok(inst.aicteId, 'Institute must have permanent aicteId');
    assert.ok(inst.name, 'Institute must have name');
    assert.ok(inst.state, 'Institute must have state');
  }
});

test('Notifications capture type and message contents', () => {
  assert.ok(notifications.length > 0);
  for (const notif of notifications) {
    assert.ok(notif.type, 'Notification must have type');
    assert.ok(notif.title, 'Notification must have title');
    assert.ok(notif.message, 'Notification must have message');
  }
});

test('Dashboard metrics contain baseline statistics', () => {
  assert.ok(dashboardStats.totalComplaints > 0);
  assert.ok(dashboardStats.disposed !== undefined);
  assert.ok(dashboardStats.pendingComplaints !== undefined);
  assert.ok(dashboardStats.overlapsDetected !== undefined);
});

console.log('\n--- Test Suite 2: Security & JWT Token Verification ---');
test('JWT token verification properly decodes role and bureau claims', () => {
  const secret = 'test-secret-aicte-264';
  const payload = {
    userId: 'usr_test_01',
    role: 'OFFICER',
    bureau: 'Regulation Bureau'
  };
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  const decoded = jwt.verify(token, secret);
  assert.strictEqual(decoded.userId, payload.userId);
  assert.strictEqual(decoded.role, payload.role);
  assert.strictEqual(decoded.bureau, payload.bureau);
});

console.log('\n=============================================================');
console.log(`🎉 ALL ${count}/${count} API & CONTRACT TESTS PASSED!`);
console.log('=============================================================\n');
