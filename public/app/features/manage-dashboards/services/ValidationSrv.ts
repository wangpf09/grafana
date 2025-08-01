import { t } from '@grafana/i18n';
import { getGrafanaSearcher } from 'app/features/search/service/searcher';

class ValidationError extends Error {
  type: string;

  constructor(type: string, message: string) {
    super(message);
    this.type = type;
  }
}

export class ValidationSrv {
  rootName = 'general';

  validateNewDashboardName(folderUID: string, name: string) {
    return this.validate(
      folderUID,
      name,
      t(
        'manage-dashboards.validation-srv.message-same-name',
        'A dashboard or a folder with the same name already exists'
      )
    );
  }

  validateNewFolderName(name?: string) {
    return this.validate(
      this.rootName,
      name,
      t(
        'manage-dashboards.validation-srv.message-same-name-general',
        'A folder or dashboard in the general folder with the same name already exists'
      )
    );
  }

  private async validate(folderUID: string, name: string | undefined, existingErrorMessage: string) {
    name = (name || '').trim();
    const nameLowerCased = name.toLowerCase();

    if (name.length === 0) {
      throw new ValidationError(
        'REQUIRED',
        t('manage-dashboards.validation-srv.message-name-required', 'Name is required')
      );
    }

    if (nameLowerCased === this.rootName) {
      throw new ValidationError(
        'EXISTING',
        t(
          'manage-dashboards.validation-srv.message-reserved-name',
          'This is a reserved name and cannot be used for a folder.'
        )
      );
    }

    const searcher = getGrafanaSearcher();

    const dashboardResults = await searcher.search({
      kind: ['dashboard'],
      query: name,
      location: folderUID || 'general',
    });

    for (const result of dashboardResults.view) {
      if (nameLowerCased === result.name.toLowerCase()) {
        throw new ValidationError('EXISTING', existingErrorMessage);
      }
    }

    return;
  }
}

export const validationSrv = new ValidationSrv();
