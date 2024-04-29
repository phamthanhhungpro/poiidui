/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

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
                link: '/tenant'
            },
            {
                id: 'group',
                title: 'Nhóm',
                type: 'basic',
                icon: 'mat_outline:groups',
                link: '/group'
            },
            {
                id: 'user',
                title: 'Thành viên',
                type: 'basic',
                icon: 'mat_outline:manage_accounts',
                link: '/user'
            },
            {
                id: 'app',
                title: 'Ứng dụng',
                type: 'basic',
                icon: 'mat_outline:apps',
                link: '/app'
            },
            {
                id: 'role',
                title: 'Vai trò',
                type: 'basic',
                icon: 'heroicons_outline:newspaper',
                link: '/role'
            }
        ]
    },
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
