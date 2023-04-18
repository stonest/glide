// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/common-fate/common-fate/pkg/service/identitysvc (interfaces: IdentityService)

// Package mocks is a generated GoMock package.
package mocks

import (
	context "context"
	reflect "reflect"

	identity "github.com/common-fate/common-fate/pkg/identity"
	gomock "github.com/golang/mock/gomock"
)

// MockIdentityService is a mock of IdentityService interface.
type MockIdentityService struct {
	ctrl     *gomock.Controller
	recorder *MockIdentityServiceMockRecorder
}

// MockIdentityServiceMockRecorder is the mock recorder for MockIdentityService.
type MockIdentityServiceMockRecorder struct {
	mock *MockIdentityService
}

// NewMockIdentityService creates a new mock instance.
func NewMockIdentityService(ctrl *gomock.Controller) *MockIdentityService {
	mock := &MockIdentityService{ctrl: ctrl}
	mock.recorder = &MockIdentityServiceMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockIdentityService) EXPECT() *MockIdentityServiceMockRecorder {
	return m.recorder
}

// UpdateUserAccessRules mocks base method.
func (m *MockIdentityService) UpdateUserAccessRules(arg0 context.Context, arg1 map[string]identity.User, arg2 map[string]identity.Group) (map[string]identity.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateUserAccessRules", arg0, arg1, arg2)
	ret0, _ := ret[0].(map[string]identity.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateUserAccessRules indicates an expected call of UpdateUserAccessRules.
func (mr *MockIdentityServiceMockRecorder) UpdateUserAccessRules(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateUserAccessRules", reflect.TypeOf((*MockIdentityService)(nil).UpdateUserAccessRules), arg0, arg1, arg2)
}
