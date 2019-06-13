import get from 'lodash/get';

import { linkToRecord } from '../../util';
import { Record } from '../../types';
import useReference from '../useReference';

interface Option {
    allowEmpty?: boolean;
    basePath: string;
    record?: Record;
    source: string;
    reference: string;
    resource: string;
    linkType: string | boolean;
}

export interface UseReferenceProps {
    isLoading: boolean;
    referenceRecord: Record;
    resourceLinkPath: string | false;
}

/**
 * @typedef ReferenceProps
 * @type {Object}
 * @property {boolean} isLoading: boolean indicating if the reference has loaded
 * @property {Object} referenceRecord: the referenced record.
 * @property {string | false} resourceLinkPath link to the page of the related record (depends on linkType) (false is no link)
 */

/**
 * Fetch reference record, and return it when avaliable
 *
 * The reference prop sould be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 *
 * const { isLoading, referenceRecord, resourceLinkPath } = useReference({
 *     source: 'userId',
 *     reference: 'users',
 *     record: {
 *         userId: 7
 *     }
 * });
 *
 * @param {Object} option
 * @param {boolean} option.allowEmpty do we allow for no referenced record (default to false)
 * @param {string} option.basePath basepath to current resource
 * @param {string | false} option.linkType The type of the link toward the referenced record. edit, show of false for no link (default to edit)
 * @param {Object} option.record The The current resource record
 * @param {string} option.reference The linked resource name
 * @param {string} option.resource The current resource name
 * @param {string} option.source The key of the linked resource identifier
 *
 * @returns {ReferenceProps} The reference props
 */
export const useReferenceField = ({
    allowEmpty = false,
    basePath,
    linkType = 'edit',
    reference,
    record = { id: '' },
    resource,
    source,
}: Option): UseReferenceProps => {
    const sourceId = get(record, source);
    const { referenceRecord, isLoading } = useReference({
        id: sourceId,
        reference,
        allowEmpty,
    });
    const rootPath = basePath.replace(resource, reference);
    const resourceLinkPath = !linkType
        ? false
        : linkToRecord(rootPath, sourceId, linkType as string);

    return {
        isLoading,
        referenceRecord,
        resourceLinkPath,
    };
};

export default useReferenceField;
