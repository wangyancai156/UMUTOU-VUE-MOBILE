import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('/admin/login', data, 'POST');

/**
 * 获取组织架构
 */
export const getorganization = () => fetch('/api/HR/Organization/GetOrganizationTree');