// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/common-fate/common-fate/pkg/service/workflowsvc (interfaces: Runtime)

// Package mocks is a generated GoMock package.
package mocks

// import (
// 	context "context"
// 	reflect "reflect"

// 	types "github.com/common-fate/common-fate/pkg/types"
// 	gomock "github.com/golang/mock/gomock"
// )

// // MockRuntime is a mock of Runtime interface.
// type MockRuntime struct {
// 	ctrl     *gomock.Controller
// 	recorder *MockRuntimeMockRecorder
// }

// // MockRuntimeMockRecorder is the mock recorder for MockRuntime.
// type MockRuntimeMockRecorder struct {
// 	mock *MockRuntime
// }

// // NewMockRuntime creates a new mock instance.
// func NewMockRuntime(ctrl *gomock.Controller) *MockRuntime {
// 	mock := &MockRuntime{ctrl: ctrl}
// 	mock.recorder = &MockRuntimeMockRecorder{mock}
// 	return mock
// }

// // EXPECT returns an object that allows the caller to indicate expected use.
// func (m *MockRuntime) EXPECT() *MockRuntimeMockRecorder {
// 	return m.recorder
// }

// // Grant mocks base method.
// func (m *MockRuntime) Grant(arg0 context.Context, arg1 types.CreateGrant) error {
// 	m.ctrl.T.Helper()
// 	ret := m.ctrl.Call(m, "Grant", arg0, arg1)
// 	ret0, _ := ret[0].(error)
// 	return ret0
// }

// // Grant indicates an expected call of Grant.
// func (mr *MockRuntimeMockRecorder) Grant(arg0, arg1 interface{}) *gomock.Call {
// 	mr.mock.ctrl.T.Helper()
// 	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Grant", reflect.TypeOf((*MockRuntime)(nil).Grant), arg0, arg1)
// }

// // Revoke mocks base method.
// func (m *MockRuntime) Revoke(arg0 context.Context, arg1 string) error {
// 	m.ctrl.T.Helper()
// 	ret := m.ctrl.Call(m, "Revoke", arg0, arg1)
// 	ret0, _ := ret[0].(error)
// 	return ret0
// }

// // Revoke indicates an expected call of Revoke.
// func (mr *MockRuntimeMockRecorder) Revoke(arg0, arg1 interface{}) *gomock.Call {
// 	mr.mock.ctrl.T.Helper()
// 	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Revoke", reflect.TypeOf((*MockRuntime)(nil).Revoke), arg0, arg1)
// }
