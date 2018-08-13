package outliner.repository.search;

import outliner.domain.L1;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the L1 entity.
 */
public interface L1SearchRepository extends ElasticsearchRepository<L1, Long> {
}
