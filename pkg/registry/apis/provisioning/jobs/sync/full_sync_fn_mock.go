// Code generated by mockery v2.53.4. DO NOT EDIT.

package sync

import (
	context "context"

	jobs "github.com/grafana/grafana/pkg/registry/apis/provisioning/jobs"
	mock "github.com/stretchr/testify/mock"

	repository "github.com/grafana/grafana/pkg/registry/apis/provisioning/repository"

	resources "github.com/grafana/grafana/pkg/registry/apis/provisioning/resources"
)

// MockFullSyncFn is an autogenerated mock type for the FullSyncFn type
type MockFullSyncFn struct {
	mock.Mock
}

type MockFullSyncFn_Expecter struct {
	mock *mock.Mock
}

func (_m *MockFullSyncFn) EXPECT() *MockFullSyncFn_Expecter {
	return &MockFullSyncFn_Expecter{mock: &_m.Mock}
}

// Execute provides a mock function with given fields: ctx, repo, compare, clients, currentRef, repositoryResources, progress
func (_m *MockFullSyncFn) Execute(ctx context.Context, repo repository.Reader, compare CompareFn, clients resources.ResourceClients, currentRef string, repositoryResources resources.RepositoryResources, progress jobs.JobProgressRecorder) error {
	ret := _m.Called(ctx, repo, compare, clients, currentRef, repositoryResources, progress)

	if len(ret) == 0 {
		panic("no return value specified for Execute")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, repository.Reader, CompareFn, resources.ResourceClients, string, resources.RepositoryResources, jobs.JobProgressRecorder) error); ok {
		r0 = rf(ctx, repo, compare, clients, currentRef, repositoryResources, progress)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// MockFullSyncFn_Execute_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Execute'
type MockFullSyncFn_Execute_Call struct {
	*mock.Call
}

// Execute is a helper method to define mock.On call
//   - ctx context.Context
//   - repo repository.Reader
//   - compare CompareFn
//   - clients resources.ResourceClients
//   - currentRef string
//   - repositoryResources resources.RepositoryResources
//   - progress jobs.JobProgressRecorder
func (_e *MockFullSyncFn_Expecter) Execute(ctx interface{}, repo interface{}, compare interface{}, clients interface{}, currentRef interface{}, repositoryResources interface{}, progress interface{}) *MockFullSyncFn_Execute_Call {
	return &MockFullSyncFn_Execute_Call{Call: _e.mock.On("Execute", ctx, repo, compare, clients, currentRef, repositoryResources, progress)}
}

func (_c *MockFullSyncFn_Execute_Call) Run(run func(ctx context.Context, repo repository.Reader, compare CompareFn, clients resources.ResourceClients, currentRef string, repositoryResources resources.RepositoryResources, progress jobs.JobProgressRecorder)) *MockFullSyncFn_Execute_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(repository.Reader), args[2].(CompareFn), args[3].(resources.ResourceClients), args[4].(string), args[5].(resources.RepositoryResources), args[6].(jobs.JobProgressRecorder))
	})
	return _c
}

func (_c *MockFullSyncFn_Execute_Call) Return(_a0 error) *MockFullSyncFn_Execute_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *MockFullSyncFn_Execute_Call) RunAndReturn(run func(context.Context, repository.Reader, CompareFn, resources.ResourceClients, string, resources.RepositoryResources, jobs.JobProgressRecorder) error) *MockFullSyncFn_Execute_Call {
	_c.Call.Return(run)
	return _c
}

// NewMockFullSyncFn creates a new instance of MockFullSyncFn. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewMockFullSyncFn(t interface {
	mock.TestingT
	Cleanup(func())
}) *MockFullSyncFn {
	mock := &MockFullSyncFn{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
