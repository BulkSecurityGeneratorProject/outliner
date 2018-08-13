package outliner.repository.search;

import outliner.domain.L3Table;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the L3Table entity.
 */
public interface L3TableSearchRepository extends ElasticsearchRepository<L3Table, Long> {
}
