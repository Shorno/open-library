import React from 'react';
import {Link, useLocation} from 'react-router';

const breadcrumbNameMap: Record<string, string> = {
    '': 'Home',
    list: 'List',
    app: 'App',
};

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <nav className="text-sm mb-4">
            <ol className="list-reset flex text-gray-500">
                <li>
                    <Link to="/" className="hover:text-blue-600">
                        {breadcrumbNameMap[''] || 'Home'}
                    </Link>
                </li>
                {pathnames.map((segment, idx) => {
                    const url = '/' + pathnames.slice(0, idx + 1).join('/');
                    const isLast = idx === pathnames.length - 1;
                    return (
                        <React.Fragment key={url}>
                            <li>
                                <span className="mx-2">/</span>
                            </li>
                            <li>
                                {isLast ? (
                                    <span className="text-gray-700">
                    {breadcrumbNameMap[segment] || segment}
                  </span>
                                ) : (
                                    <Link to={url} className="hover:text-blue-600">
                                        {breadcrumbNameMap[segment] || segment}
                                    </Link>
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
