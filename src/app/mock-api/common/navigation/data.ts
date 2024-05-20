/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
import { Constants } from '../constants';
import { isAllowSetPermission } from '../user/roleHelper';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'id',
        title: 'ID Management',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'tenant',
                title: 'Cơ quan',
                type: 'basic',
                icon: 'heroicons_outline:building-office-2',
                link: '/tenant',
                hidden(item) {
                    // always hide this item if role is not SSA
                    if (localStorage.getItem('role') !== Constants.ROLE_SSA) {
                        return true;
                    }
                    return false;
                },
            },
            {
                id: 'group',
                title: 'Nhóm',
                type: 'basic',
                icon: 'mat_outline:groups',
                link: '/group',
                hidden(item) {
                    // always hide this item if role is not SSA
                    if (localStorage.getItem('role') === Constants.ROLE_SSA) {
                        return true;
                    }
                    return false;
                },
            },
            {
                id: 'user',
                title: 'Thành viên',
                type: 'basic',
                icon: 'mat_outline:manage_accounts',
                link: '/user'
            },
            {
                id: 'app-ssa',
                title: 'Quản lý ứng dụng',
                type: 'basic',
                icon: 'mat_outline:apps',
                link: '/app-ssa',
                hidden(item) {
                    // always hide this item if role is not SSA
                    if (localStorage.getItem('role') !== Constants.ROLE_SSA) {
                        return true;
                    }
                    return false;
                },
            },
            {
                id: 'app-admin',
                title: 'Ứng dụng của tôi',
                type: 'basic',
                icon: 'mat_outline:apps',
                link: '/app-admin',
                hidden(item) {
                    // always hide this item if role is SSA
                    if (localStorage.getItem('role') === Constants.ROLE_SSA) {
                        return true;
                    }
                    return false;
                },
            },
            {
                id: 'role',
                title: 'Vai trò',
                type: 'basic',
                icon: 'heroicons_outline:newspaper',
                link: '/role',
                hidden(item) {
                    // always hide this item if role is not SSA
                    if (localStorage.getItem('role') !== Constants.ROLE_SSA) {
                        return true;
                    }
                    return false;
                },
            }
        ]
    },
    {
        id: 'permission',
        title: 'Phân quyền người dùng',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'function',
                title: 'Chức năng',
                type: 'basic',
                icon: 'mat_solid:functions',
                link: '/function',
                hidden(item) {
                    // always hide this item if role is not SSA
                    if (localStorage.getItem('role') !== Constants.ROLE_SSA) {
                        return true;
                    }
                    return false;
                },
            },
            {
                id: 'assign-permission',
                title: 'Phân quyền chức năng',
                type: 'basic',
                icon: 'mat_solid:verified_user',
                link: '/permission',
                hidden(item) {
                    if (!isAllowSetPermission(localStorage.getItem('role'))) {
                        return true;
                    }
                    return false;
                },
            },

        ]
    },
    {
        id: 'categories',
        title: 'Danh mục',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'dantoc',
                title: 'Dân tộc',
                type: 'basic',
                link: '/categories/dan-toc',
                hidden(item) {
                    return false;
                },
            },
            {
                id: 'tongiao',
                title: 'Tôn giáo',
                type: 'basic',
                link: '/categories/ton-giao',
                hidden(item) {
                    return false;
                },
            },

        ]
    },
    {
        id: 'settings',
        title: 'Cài đặt',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'don-vi',
                title: 'Thông tin Cơ quan - Đơn vị',
                type: 'basic',
                link: '/settings/don-vi',
                hidden(item) {
                    return false;
                },
            },
            {
                id: 'chi-nhanh',
                title: 'Chi nhánh/Văn phòng',
                type: 'basic',
                link: '/settings/chi-nhanh',
                hidden(item) {
                    return false;
                },
            },
            {
                id: 'phong-ban-bo-phan',
                title: 'Phòng/Ban/Bộ phận',
                type: 'basic',
                link: '/settings/phong-ban-bo-phan',
                hidden(item) {
                    return false;
                },
            },
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'id',
        title: 'ID Management',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [

        ]
    },
    {
        id: 'permission',
        title: 'Phân quyền người dùng',
        type: 'group',
        icon: 'heroicons_outline:home',
        hidden(item) {
            if (!isAllowSetPermission(localStorage.getItem('role'))) {
                return true;
            }
            return false;
        },
        children: [

        ]
    },
    {
        id: 'categories',
        title: 'Danh mục',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: []
    },
    {
        id: 'settings',
        title: 'Cài đặt',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
        ],
        hidden(item) {
            if (!isAllowSetPermission(localStorage.getItem('role'))) {
                return true;
            }
            return false;
        },
    }
];

export const firstNavigation: FuseNavigationItem[] = [
    {
        id: 'hrm',
        title: 'Hệ thống thông tin nhân sự',
        type: 'basic',
        icon: 'mat_outline:psychology',
        link: 'hrm'
    },
    {
        id: 'prj',
        title: 'Hệ thống thông tin công việc',
        type: 'basic',
        icon: 'mat_outline:task',
        link: 'prj'
    },
    {
        id: 'checkin',
        title: 'Hệ thống thông tin điểm danh',
        type: 'basic',
        icon: 'mat_outline:emoji_people',
        link: 'checkin'
    }
];

export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
