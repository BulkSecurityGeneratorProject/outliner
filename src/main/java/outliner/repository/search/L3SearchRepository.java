package outliner.repository.search;

import outliner.domain.L3;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the L3 entity.
 */
public interface L3SearchRepository extends ElasticsearchRepository<L3, Long> {
}
